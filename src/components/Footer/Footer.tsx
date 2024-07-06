"use client";
import React from "react";
import { FaFacebook, FaWhatsapp, FaInstagram, FaTwitter } from "react-icons/fa";
import { TooltipPrivate } from "@/components/TooltipPrivate";

export function Footer() {
  function Twiter() {
    return (
      <div>
        <FaTwitter className="w-4 h-4" aria-hidden="true" />
      </div>
    );
  }
  function Instagram() {
    return (
      <div>
        <FaInstagram className="w-4 h-4" aria-hidden="true" />
      </div>
    );
  }
  function Whatsapp() {
    return (
      <div>
        <FaWhatsapp className="w-4 h-4" aria-hidden="true" />
      </div>
    );
  }
  function Facebook() {
    return (
      <div>
        <FaFacebook className="w-4 h-4" aria-hidden="true" />
      </div>
    );
  }

  return (
    <footer className="bg-white rounded-lg shadow sm:flex sm:items-center sm:justify-between p-4 sm:p-6 xl:p-8 dark:bg-gray-800 antialiased">
      <p className="mb-4 text-sm text-center text-gray-500 dark:text-gray-400 sm:mb-0">
        &copy; {new Date().getFullYear()}{" "}
        <a
          href="https://flowbite.com/"
          className="hover:underline"
          target="_blank"
        >
          LatinDoors.com
        </a>
        . All rights reserved.
      </p>

      <div className="flex justify-center items-center space-x-1">
        <a
          href="#"
          data-tooltip-target="tooltip-facebook"
          className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <TooltipPrivate
            element={<Facebook />}
            tooltips="Síguenos en Facebook"
          />
        </a>

        <a
          href="#"
          data-tooltip-target="tooltip-instagram"
          className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <TooltipPrivate
            element={<Instagram />}
            tooltips="Síguenos en Instagram"
          />
        </a>

        <a
          href="#"
          data-tooltip-target="tooltip-whatsapp"
          className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <TooltipPrivate
            element={<Whatsapp />}
            tooltips="Escríbenos por Whatsapp"
          />
        </a>

        <a
          href="#"
          data-tooltip-target="tooltip-twitter"
          className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <TooltipPrivate element={<Twiter />} tooltips="Sígenos en Twitter" />
        </a>
      </div>
    </footer>
  );
}
