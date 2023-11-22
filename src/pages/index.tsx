import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import css from "@/styles/Auth.module.scss";
import { useSearchParams } from "next/navigation";
import Login from "@/components/Login";
import Register from "@/components/Register";
import { Handle } from "@/utils";
import sm_bg from "@/assets/images/sm-bg.svg";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const params = useSearchParams();

  const selectComponent = () => {
    const auth_mode = params.get("auth_mode");

    if (auth_mode === "signup") return <Register />;
    else return <Login />;
  };

  return (
    <>
      <Head>
        <title>PayPro</title>
        <meta name="description" content="Your no. 1 invoicing platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
          integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
          {...{ crossorigin: "anonymous", referrerpolicy: "no-referrer" }}
        />
      </Head>
      <main className={css.auth}>
        <div className={css.wrapper}>
          <div className={css.left}>
            <a href="/" className={css.logo}>
              {/* <img src="/" alt="logo" /> */}
              <span>PayPro</span>
            </a>
            <div className={css.content_wrapper}>
              <span className={css.heading}>Welcome to PayPro 😊!</span>
              <span className={css.content}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur doloribus quisquam, amet reprehenderit quia dicta
                obcaecati nesciunt praesentium eius! Corrupti!
              </span>
              <div className={css.handles}>
                {[
                  new Handle(
                    "https://facebook.com/#",
                    "fa-brands fa-facebook-f",
                    "Facebook"
                  ),
                  new Handle(
                    "https://facebook.com/#",
                    "fa-brands fa-twitter",
                    "Twitter"
                  ),
                  new Handle(
                    "https://facebook.com/#",
                    "fa-brands fa-linkedin-in",
                    "Linkedin"
                  ),
                ].map((handle) => (
                  <>
                    <a
                      href={handle.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i
                        className={`${handle.icon} ${css.icon}`}
                        title={handle.name}
                      ></i>
                    </a>
                  </>
                ))}
              </div>
            </div>
          </div>
          <div className={css.right}>{selectComponent()}</div>
        </div>
      </main>
    </>
  );
}
