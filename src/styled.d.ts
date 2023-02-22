import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		colorBg: string;
		colorPrimary: string;
		colorSecondary: string;
		colorTertiary: string;
		textPrimary: string;
		textSecondary: string;
	}
}
