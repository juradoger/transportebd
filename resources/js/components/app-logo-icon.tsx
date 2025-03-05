import { HtmlHTMLAttributes } from 'react';

export default function AppLogoIcon(props: HtmlHTMLAttributes<HTMLImageElement>) {
    return <img src="/img/logo.png" alt="" className="size-10" {...props} />;
}
