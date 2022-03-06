import "@babel/polyfill";
import dotenv from "dotenv";
import "isomorphic-fetch";
import createShopifyAuth, {verifyRequest} from "@shopify/koa-shopify-auth";
import Shopify, {ApiVersion} from "@shopify/shopify-api";
import Koa from "koa";
import next from "next";
import Router from "koa-router";

dotenv.config();
const port = parseInt(process.env.PORT, 10) || 8081;
const dev = process.env.NODE_ENV !== "production";
const app = next({
    dev,
});
const handle = app.getRequestHandler();
const JwtToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2NvbGxlY3RpYmxlcy1zbmVha2Vycy5teXNob3BpZnkuY29tL2FkbWluIiwiZGVzdCI6Imh0dHBzOi8vY29sbGVjdGlibGVzLXNuZWFrZXJzLm15c2hvcGlmeS5jb20iLCJhdWQiOiIzOTU1NmFiMGYxMTg1NTE4MWRiMDU4ZWUzY2IyMThmNSIsInN1YiI6Ijc3MTAyNzEwOTU1IiwiaWF0IjoxNjQwNzc5MjIwLCJqdGkiOiJjMTk3ZGYyZC02OTM3LTQxNjktYjUyMC1iZmUyNDczZTM3MTYiLCJzaWQiOiJhN2U2MGY4ZjU5OGU3MjU1YmE2YzJkOTFiYmQxOGE4YzZhNjIxNjcyOWNmNjJhYTFlNzFmMGE4ZmQ4NTUxZWZhIn0.U6JfSYk1KrVC0UdWUn7zycHtXBDItSt-qzxcU5QQbVo";
Shopify.Context.initialize({
    API_KEY: "858b5e471ef9a7506863936f0a5c05b6",
    API_SECRET_KEY: "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",
    SCOPES: "read_products,read_customers,read_orders,read_order_edits,read_draft_orders,read_fulfillments,read_shipping,read_inventory",
    HOST_NAME: "https://botnot0124.herokuapp.com",
    API_VERSION: ApiVersion.October20,
    IS_EMBEDDED_APP: true,
    SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
});

const ACTIVE_SHOPIFY_SHOPS = {};

app.prepare().then(async () => {
    const server = new Koa();
    const router = new Router();
    server.keys = [Shopify.Context.API_SECRET_KEY];
    server.use(
        createShopifyAuth({
            async afterAuth(ctx) {
                const {shop, accessToken, scope} = ctx.state.shopify;
                const host = ctx.query.host;                
                ACTIVE_SHOPIFY_SHOPS[shop] = scope;
                const response = await Shopify.Webhooks.Registry.register({
                    shop,
                    accessToken,
                    path: "/webhooks",
                    topic: "APP_UNINSTALLED",
                    webhookHandler: async (topic, shop, body) =>
                        delete ACTIVE_SHOPIFY_SHOPS[shop],
                });

                if (!response.success) {
                    console.log(
                        `Failed to register APP_UNINSTALLED webhook: ${response.result}`
                    );
                }

                // Redirect to app with shop parameter upon auth
                ctx.redirect(`/?shop=${shop}&host=${host}`);
            },
        })
    );

    const handleRequest = async (ctx) => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
        ctx.res.statusCode = 200;
    };

    router.post("/webhooks", async (ctx) => {
        try {
            await Shopify.Webhooks.Registry.process(ctx.req, ctx.res);
            console.log(`Webhook processed, returned status code 200`);
        } catch (error) {
            console.log(`Failed to process webhook: ${error}`);
        }
    });

    router.post(
        "/graphql",
        verifyRequest({returnHeader: true}),
        async (ctx, next) => {
            await Shopify.Utils.graphqlProxy(ctx.req, ctx.res);
        }
    );
    router.get("/health", async (ctx) => {
        ctx.res.statusCode = 200;
        ctx.body = `Health check: v${process.env.SHOPIFY_APP_VERSION}`;
    });
    router.get("/api/dashboard", async (ctx) => {
        const authHeader = ctx.get('Authorization'); 
        const response = await fetch(`${process.env.BOTNOT_API_URL}dashboard/`, {
            method: "POST",
            headers: {
                'Authorization': JwtToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filter: {
                    date_from: ctx.query.date_from,
                    date_to: ctx.query.date_to
                },
                pagination: {
                    from: (Number(ctx.query.page) - 1) * Number(ctx.query.page_size),
                    size: Number(ctx.query.page_size)
                }
            }),
        });
        ctx.res.statusCode = 200;
        ctx.body = await response.text();     
    });
    router.post("/api/transaction/:ids/approve", async (ctx) => {
        const authHeader = ctx.get('Authorization');
        const ids = ctx.params.ids.split(',').map(Number);
        const response = await fetch(`${process.env.BOTNOT_API_URL}transaction/`, {
            method: "POST",
            headers: {
                'Authorization': JwtToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: "order_mark_as_safe",
                order_ids: ids,
            }),
        });
        ctx.res.statusCode = 200;
        ctx.body = JSON.stringify({ success: true });
    });
    router.post("/api/transaction/:ids/mark_as_fraud", async (ctx) => {
        const authHeader = ctx.get('Authorization');
        const ids = ctx.params.ids.split(',').map(Number);
        await fetch(`${process.env.BOTNOT_API_URL}transaction/`, {
            method: "POST",
            headers: {
                'Authorization': JwtToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: "order_mark_as_fraud",
                order_ids: ids,
            }),
        });
        ctx.res.statusCode = 200;
        ctx.body = JSON.stringify({ success: true });
    });
    router.get("/api/transactions", async (ctx) => {
        const authHeader = ctx.get('Authorization');        
        const response = await fetch(`${process.env.BOTNOT_API_URL}transaction/`, {
            method: "POST",
            headers: {
                'Authorization': JwtToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: "transaction_list",
                filter: {
                    date_from: ctx.query.date_from,
                    date_to: ctx.query.date_to
                },
                order_by: [
                    "order_id"
                ],
                pagination: {
                    from: (Number(ctx.query.page) - 1) * Number(ctx.query.page_size),
                    size: Number(ctx.query.page_size)
                }
            }),
        });        
        ctx.res.statusCode = 200;
        ctx.body = await response.text();
    });
    router.get("/api/transaction/:id", async (ctx) => {
        const authHeader = ctx.get('Authorization');
        const response = await fetch(`${process.env.BOTNOT_API_URL}transaction/`, {
            method: "POST",
            headers: {
                'Authorization': JwtToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: "transaction_list",
                filter: {
                    order_id: ctx.params.id,
                },
                order_by: [
                    "order_id"
                ],
                pagination: {
                    from: 0,
                    size: 1
                },
                return_fields:[
                    "orders.order_number",
                    "orders.shipping_address",
                    "orders.total_price_usd",
                    "orders.browser_ip",
                    "orders.items"
                ]
            }),
        });
        ctx.res.statusCode = 200;
        ctx.body = await response.text();
    });

    router.get("(/_next/static/.*)", handleRequest); // Static content is clear
    router.get("/_next/webpack-hmr", handleRequest); // Webpack content is clear
    router.get("(.*)", async (ctx) => {
        const shop = ctx.query.shop;
        if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
            ctx.redirect(`/auth?shop=${shop}`);
        } else {
            await handleRequest(ctx);
        }
    });

    server.use(router.allowedMethods());
    server.use(router.routes());
    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
});
