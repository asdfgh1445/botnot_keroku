import React from "react";
import Link from "next/link";
import { useChat } from "react-live-chat-loader";

function Menu() {
  const [state, loadChat] = useChat();
  return (
    <>
      <ul className="main-menu">
        <li>
          <Link href="/">
            <a>
              <span className="icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 -4.76837e-08V3.03C14.39 3.52 17 6.42 17 9.95C17 10.85 16.82 11.7 16.5 12.49L19.12 14.02C19.68 12.78 20 11.4 20 9.95C20 4.77 16.05 0.5 11 -4.76837e-08ZM10 16.95C8.14348 16.95 6.36301 16.2125 5.05025 14.8997C3.7375 13.587 3 11.8065 3 9.95C3 6.42 5.61 3.52 9 3.03V-4.76837e-08C3.94 0.5 0 4.76 0 9.95C0 12.6022 1.05357 15.1457 2.92893 17.0211C3.85752 17.9497 4.95991 18.6863 6.17317 19.1888C7.38642 19.6913 8.68678 19.95 10 19.95C13.3 19.95 16.23 18.34 18.05 15.86L15.45 14.33C14.17 15.95 12.21 16.95 10 16.95Z" />
                </svg>
              </span>
              <span className="text">
                <strong>Dashboard</strong>
                Track the bot traffic across your products
              </span>
            </a>
          </Link>
        </li>

        <li>
          <Link href="/transactions">
            <a>
              <span className="icon">
                <svg
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 0H4V4H16V0ZM17 9C16.7348 9 16.4804 8.89464 16.2929 8.70711C16.1054 8.51957 16 8.26522 16 8C16 7.73478 16.1054 7.48043 16.2929 7.29289C16.4804 7.10536 16.7348 7 17 7C17.2652 7 17.5196 7.10536 17.7071 7.29289C17.8946 7.48043 18 7.73478 18 8C18 8.26522 17.8946 8.51957 17.7071 8.70711C17.5196 8.89464 17.2652 9 17 9ZM14 16H6V11H14V16ZM17 5H3C2.20435 5 1.44129 5.31607 0.87868 5.87868C0.316071 6.44129 0 7.20435 0 8V14H4V18H16V14H20V8C20 7.20435 19.6839 6.44129 19.1213 5.87868C18.5587 5.31607 17.7956 5 17 5Z" />
                </svg>
              </span>
              <span className="text">
                <strong>Transactions</strong>
                insights into individual transactions
              </span>
            </a>
          </Link>
        </li>
      </ul>

      <div className="small-menu">
        <nav className="Polaris-Navigation">
          <div
            className="Polaris-Navigation__PrimaryNavigation Polaris-Scrollable Polaris-Scrollable--vertical"
            data-polaris-scrollable="true"
          >
            <ul className="Polaris-Navigation__Section">
              <li className="Polaris-Navigation__ListItem">
                <div className="Polaris-Navigation__ItemWrapper">
                  <a
                    className="Polaris-Navigation__Item"
                    target="_top"
                    tabIndex="0"
                    data-polaris-unstyled="true"
                    onClick={() => loadChat({ open: true })}
                  >
                    <div className="Polaris-Navigation__Icon">
                      <span className="Polaris-Icon">
                        <svg
                          viewBox="0 0 20 20"
                          className="Polaris-Icon__Svg"
                          focusable="false"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11 11H9v-.148c0-.876.306-1.499 1-1.852.385-.195 1-.568 1-1a1.001 1.001 0 0 0-2 0H7c0-1.654 1.346-3 3-3s3 1 3 3-2 2.165-2 3zm-2 4h2v-2H9v2zm1-13a8 8 0 1 0 0 16 8 8 0 0 0 0-16z"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <span className="Polaris-Navigation__Text">
                      Open a Ticket
                    </span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Menu;
