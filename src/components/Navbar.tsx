import { useRef, useState } from "react";

type Props = {
  font: string;
  setFont: React.Dispatch<React.SetStateAction<string>>;
  darkTheme: boolean;
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
};

const fonts: Record<string, string> = {
  sans: "Sans Serif",
  serif: "Serif",
  mono: "Mono",
};

export const Navbar = ({ font, setFont, darkTheme, setDarkTheme }: Props) => {
  const [showFontsDropdown, setShowFontsDropdown] = useState(false);
  const themeToggleRef = useRef<HTMLInputElement | null>(null);

  return (
    <nav className="navbar">
      <img src={"/logo.svg"} alt="" />

      <div className="right">
        <div className="fonts">
          <button
            className="fonts-dropdown-button"
            onClick={() => setShowFontsDropdown((prev) => !prev)}
          >
            <div className={font}>{fonts[font]}</div>
            <img src={"/icon-arrow-down.svg"} alt="arrow" />
          </button>
          {showFontsDropdown && (
            <div className="fonts-dropdown">
              {Object.entries(fonts).map(([key, value]) => (
                <span
                  key={key}
                  className={key}
                  onClick={() => {
                    setFont(key);
                    setShowFontsDropdown(false);
                  }}
                >
                  {value}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="theme-toggle">
          <input
            ref={themeToggleRef}
            checked={darkTheme}
            onChange={(e) => setDarkTheme(e.target.checked)}
            className="toggle-checkbox"
            type="checkbox"
          />
          <div
            onClick={() => {
              if (!themeToggleRef?.current) {
                return;
              }

              themeToggleRef?.current?.click();
            }}
            className="toggle-switch"
          />
          <img
            src={darkTheme ? "/icon-moon-dark.svg" : "/icon-moon.svg"}
            alt="moon"
          />
        </div>
      </div>
      {/* {dropdown && (
        <div className="dropdown">
        <div
              className="sans"
              onClick={() => {
                setFount("sans");
                setDropdown(false);
              }}
            >
              sans
            </div>
            <div
              className="serif"
              onClick={() => {
                setFount("serif");
                setDropdown(false);
              }}
            >
              serif
            </div>
            <div
              className="mono"
              onClick={() => {
                setFount("mono");
                setDropdown(false);
              }}
            >
              mono
            </div>
          </div>
        )}
        <CustomToggle
          onChange={(e) => setDark(e.target.checked)}
          onClick={() => new Audio(clickSound).play()}
        />
        <img src={dark ? moon_dark : moon} alt="" /> */}
    </nav>
  );
};
