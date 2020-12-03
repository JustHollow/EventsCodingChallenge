import * as React from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import NextLink, { LinkProps } from "next/link";
import MuiLink, { LinkProps as MuiLinkProps } from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    link: {
        textDecoration: "none",
        color: "inherit",
        "&:hover": {
            textDecoration: "none",
        },
    },
});

const NextComposed = React.forwardRef<
    HTMLAnchorElement,
    LinkProps & { className: string }
>(function NextComposed(props, ref) {
    const classes = useStyles();
    const { as, href, ...other } = props;

    return (
        <NextLink href={href} as={as}>
            <a
                ref={ref}
                {...other}
                className={clsx(classes.link, props.className)}
            />
        </NextLink>
    );
});

type CustomLinkProps = LinkProps &
    MuiLinkProps & {
        /**
         * use native NextJS link
         */
        naked?: boolean;

        activeClassName?: string;
    };

const Link = (props: CustomLinkProps) => {
    const {
        href,
        activeClassName = "active",
        className: classNameProps,
        innerRef,
        naked,
        ...other
    } = props;

    const router = useRouter();
    const pathname = typeof href === "string" ? href : href.pathname;
    const className = clsx(classNameProps, {
        [activeClassName]: router.pathname === pathname && activeClassName,
    });

    if (naked) {
        return (
            <NextComposed
                className={className}
                ref={innerRef}
                href={href}
                {...other}
            />
        );
    }

    return (
        <MuiLink
            component={NextComposed}
            className={className}
            ref={innerRef}
            href={href}
            {...other}
        />
    );
};

export default React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
    (props, ref) => <Link {...props} innerRef={ref} />
);
