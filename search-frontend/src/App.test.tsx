import React from "react";
import { queryByAttribute, render, screen } from "@testing-library/react";
import App from "./App";

const getById = queryByAttribute.bind(null, "id");

test("renders title message", () => {
  render(<App />);
  const linkElement = screen.getByText(
    /Enter details to bring up positions of look up string in search results./
  );
  expect(linkElement).toBeInTheDocument();
});

test("renders search keyword element", () => {
  const dom = render(<App />);
  const linkElementLabel = screen.getByText(/Search keyword/);
  expect(linkElementLabel).toBeInTheDocument();
  const linkElementInputBox = getById(dom.container, "searchKeyword");
  expect(linkElementInputBox).toBeInTheDocument();
});

test("renders Look up string element", () => {
  const dom = render(<App />);
  const linkElementLabel = screen.getByText(/Look up string/);
  expect(linkElementLabel).toBeInTheDocument();
  const linkElementInputBox = getById(dom.container, "lookupString");
  expect(linkElementInputBox).toBeInTheDocument();
});

test("renders Search engine element", () => {
  const dom = render(<App />);
  const linkElement = screen.getByText(/Search engine/);
  expect(linkElement).toBeInTheDocument();
  const linkElementInputBox = getById(dom.container, "searchEngine");
  expect(linkElementInputBox).toBeInTheDocument();
});

test("renders Number of search results to scan element", () => {
  const dom = render(<App />);
  const linkElement = screen.getByText(/Number of search results to scan/);
  expect(linkElement).toBeInTheDocument();
  const linkElementInputBox = getById(dom.container, "maxResults");
  expect(linkElementInputBox).toBeInTheDocument();
});

test("renders Submit element", () => {
  render(<App />);
  const linkElement = screen.getByText(/Submit/);
  expect(linkElement).toBeInTheDocument();
});
