"use client";

import {
  Navbar as NavBarComponent,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "../ui/avatar";
import Link from "next/link";

export default function Navbar() {
  const { data } = useSession();

  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "About",
      link: "#about",
    },
    {
      name: "Contact",
      link: "#cta",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <NavBarComponent>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-4">
          {!data ? <>
            <NavbarButton variant="secondary" className="text-white" href="/sign-in">Login</NavbarButton>
            <NavbarButton variant="primary" className="rounded-full" href="/sign-up">Sign up free</NavbarButton>
          </> :
            <Link href="/dashboard">
              <Avatar className="h-full">
                <AvatarImage src={data.user.image || ""} />
              </Avatar>
            </Link>
          }
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <div className="flex gap-2">
            {data && <Link href="/dashboard">
              <Avatar className="h-6 w-6">
                <AvatarImage src={data.user.image || ""} />
              </Avatar>
            </Link>}
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
        >
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">{item.name}</span>
            </a>
          ))}
          {!data ?
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
                href="/sign-in"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Sign up free
              </NavbarButton>
            </div> : null
          }
        </MobileNavMenu>
      </MobileNav>
    </NavBarComponent>
  );
}

