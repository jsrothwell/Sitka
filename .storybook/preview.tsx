import type { Preview, Decorator } from "@storybook/react";
import React from "react";
import "../src/app/globals.css";

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme ?? "dark";
  return (
    <div
      data-theme={theme}
      style={{
        background: theme === "dark" ? "rgb(9 9 12)" : "rgb(252 252 253)",
        minHeight: "100vh",
        padding: "2rem",
        colorScheme: theme,
      }}
    >
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "dark",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "dark",  title: "Dark",  icon: "moon" },
          { value: "light", title: "Light", icon: "sun" },
        ],
        showName: true,
      },
    },
  },
  parameters: {
    layout: "centered",
    viewport: {
      viewports: {
        mobile: { name: "Mobile", styles: { width: "390px",  height: "844px"  } },
        tablet: { name: "Tablet", styles: { width: "768px",  height: "1024px" } },
        desktop:{ name: "Desktop",styles: { width: "1440px", height: "900px"  } },
      },
      defaultViewport: "desktop",
    },
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date:  /Date$/i,
      },
    },
  },
};

export default preview;
