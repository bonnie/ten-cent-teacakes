import { toHaveNoViolations } from "jest-axe";

import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";
import Musicians from "@/pages/band";
import { fireEvent, render, screen } from "@/test-utils";

expect.extend(toHaveNoViolations);

// for typescript
const mockedUseWhitelistUser = useWhitelistUser as jest.Mock;

// Test modal appearance / disappearance for complicated "musician" dialogs
// Modal functionality testing occurs in e2e cypress tests
beforeEach(() => {
  // mocking returned user
  mockedUseWhitelistUser.mockImplementation(() => ({
    user: { email: "test@test.com" },
  }));
});
afterEach(() => {
  mockedUseWhitelistUser.mockImplementation(() => ({
    user: undefined,
  }));
});

test("Add modal appearance / disappearance", async () => {
  render(<Musicians />, { renderOptions: { hydrate: true } });

  // find add buttons
  const addButtons = screen.getAllByRole("button", { name: /add/i });
  expect(addButtons).toHaveLength(2);
  addButtons.forEach((button) => expect(button).toBeVisible());

  // check that modal is hidden
  const notModalTitle = screen.queryByRole("heading", {
    name: /add musician/i,
  });
  expect(notModalTitle).not.toBeInTheDocument();

  // isolate musician add button (the first; instruments is the second)
  const musicianAddButton = addButtons[0];

  // click and check for modal appearance
  fireEvent.click(musicianAddButton);
  const modalTitle = await screen.findByRole("heading", {
    name: /add musician/i,
  });
  expect(modalTitle).toBeVisible();

  // check for form elements
  const firstNameInput = screen.getByRole("textbox", { name: /first name/i });
  expect(firstNameInput).toBeInTheDocument();

  const lastNameInput = screen.getByRole("textbox", { name: /last name/i });
  expect(lastNameInput).toBeInTheDocument();

  const bioInput = screen.getByRole("textbox", { name: /bio/i });
  expect(bioInput).toBeInTheDocument();

  // instrument checkboxes
  const instrumentCheckboxes = await screen.findAllByRole("checkbox");
  expect(instrumentCheckboxes).toHaveLength(7);

  // instrument add button (there will be 2, one in modal, one on page)
  const instrumentAddButton = screen.getAllByLabelText("Add Instrument");
  expect(instrumentAddButton).toHaveLength(2);

  // file upload
  const fileInput = screen.getByLabelText(/image-upload/);
  expect(fileInput).toHaveAttribute("type", "file");

  // cancel and check for modal disappearance
  const cancelButton = screen.getByRole("button", { name: /cancel/i });
  fireEvent.click(cancelButton);
  expect(modalTitle).not.toBeVisible();

  // to avoid "not wrapped in act" errors
  await screen.findAllByRole("img");
});

test("Edit modal appearance / disappearance", async () => {
  render(<Musicians />, { renderOptions: { hydrate: true } });

  // wait for musicians to load
  await screen.findAllByRole("img");

  // find edit buttons
  const editButtons = screen.getAllByRole("button", { name: /edit/i });

  // check that modals are hidden
  const notModalTitle = screen.queryByRole("heading", {
    name: /edit musician/i,
  });
  expect(notModalTitle).not.toBeInTheDocument();

  // isolate first musician edit button
  const sarahEditButton = editButtons[0];

  // click and check for modal appearance
  fireEvent.click(sarahEditButton);
  const modalTitle = await screen.findByRole("heading", {
    name: /edit musician/i,
  });
  expect(modalTitle).toBeVisible();

  // check for form elements
  const firstNameInput = screen.getByDisplayValue("Sarah");
  expect(firstNameInput).toBeInTheDocument();

  const lastNameInput = screen.getByDisplayValue("Gronquist");
  expect(lastNameInput).toBeInTheDocument();

  const bioInput = screen.getByDisplayValue(/music and dancing/i);
  expect(bioInput).toBeInTheDocument();

  // instrument checkboxes
  const instrumentCheckboxes = await screen.findAllByRole("checkbox");
  expect(
    instrumentCheckboxes.filter((checkbox) => checkbox.hasAttribute("checked")),
  ).toHaveLength(3);

  // instrument add button (there will be 2, one in modal, one on page)
  const instrumentAddButton = screen.getAllByLabelText("Add Instrument");
  expect(instrumentAddButton).toHaveLength(2);

  // file upload
  const fileInput = screen.getByLabelText(/image-upload/);
  expect(fileInput).toHaveAttribute("type", "file");

  // cancel and check for modal disappearance
  const cancelButton = screen.getByRole("button", { name: /cancel/i });
  fireEvent.click(cancelButton);
  expect(modalTitle).not.toBeVisible();

  // to avoid "not wrapped in act" errors
  await screen.findAllByRole("img");
});

test("Delete modal appearance / disappearance", async () => {
  render(<Musicians />, { renderOptions: { hydrate: true } });

  // find (instrument) delete buttons -- musicians don't have delete button
  const deleteButtons = await screen.findAllByRole("button", {
    name: /delete instrument/i,
  });

  // check that delete modal is hidden
  const notModalTitle = screen.queryByRole("heading", {
    name: /delete instrument/i,
  });
  expect(notModalTitle).not.toBeInTheDocument();

  // isolate first enabled delete button
  const enabledDeleteButton = deleteButtons.filter(
    (button) => !button.hasAttribute("disabled"),
  )[0];

  // click and check for modal appearance
  fireEvent.click(enabledDeleteButton);
  const modalTitle = await screen.findByRole("heading", {
    name: /delete instrument/i,
  });
  expect(modalTitle).toBeVisible();

  // cancel and check for modal disappearance
  const cancelButton = screen.getByRole("button", { name: /cancel/i });
  fireEvent.click(cancelButton);
  expect(modalTitle).not.toBeVisible();
});
