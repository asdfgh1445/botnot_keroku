import React from "react";
import Link from "next/link";
import { useChat } from "react-live-chat-loader";
import {
  BsPerson,
  BsCreditCard,
  BsBell,
  BsQuestionCircle,
} from "react-icons/bs";
function UpgradeMenu() {
  const [state, loadChat] = useChat();
  return (
    <>
      <ul>
        <li>
          <Link href="/">
            <a>
              <BsPerson
                style={{
                  fontSize: "20px",
                  color: "#367BF5",
                  marginRight: "10px",
                }}
              />
              <span className="text">
                <strong>Account</strong>
                General
              </span>
            </a>
          </Link>
        </li>

        <li>
          <Link href="/transactions">
            <a>
              <BsCreditCard
                style={{
                  fontSize: "20px",
                  color: "#2FA84F",
                  marginRight: "10px",
                }}
              />
              <span className="text">
                <strong>Billing & Cards</strong>
                Payment methods
              </span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/transactions">
            <a>
              <BsBell
                style={{
                  fontSize: "20px",
                  color: "#F3AA18",
                  marginRight: "10px",
                }}
              />
              <span className="text">
                <strong>Notifications</strong>
                Email, desktop, mobile
              </span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/transactions">
            <a>
              <BsQuestionCircle
                style={{
                  fontSize: "20px",
                  color: "#069697",
                  marginRight: "10px",
                }}
              />
              <span className="text">
                <strong>Ticketing</strong>
                Any Bugs or Issues
              </span>
            </a>
          </Link>
        </li>
      </ul>
    </>
  );
}

export default UpgradeMenu;
