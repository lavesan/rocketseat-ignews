import React, { cloneElement } from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

interface IActiveLinkProps extends LinkProps {
    children: React.ReactElement;
    activeClassName: string;
}

export function ActiveLink({ children, activeClassName, ...props }: IActiveLinkProps) {
    const { asPath } = useRouter();

    const className = asPath === props.href ? activeClassName : '';

    return (
        <Link {...props}>
            {cloneElement(children, {
                className,
            })}
        </Link>
    )
}