# Screenshot Precision

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/85af753d-81d3-48e1-8cd2-85efd7c2e0b7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## P2 Lead Feedback sheet

The P2 website form writes to the `Lead Feedback` tab in `Joseph Lead Sheet`. It fills columns A–F using the headers in row 2. The remaining columns are for the team to fill in.

Use the existing P3 Lead Feedback Receiver. Set `GOOGLE_SHEET_WEBHOOK_URL` on the P2 server to its deployed Web app `/exec` URL. Set `GOOGLE_SHEET_WEBHOOK_SECRET` on the P2 server to the existing matching Script Property value. P2 sends `webhookSecret` and `landingPageSource: "VSL 2"` and requires a successful JSON response with `saved: true` before showing success. The receiver adds the timestamp in column A and writes the five form fields in columns B–F. Configure these values in the P2 Vercel project, `elevate21/josephazizrealestate`.

## GoHighLevel evaluation form

The website form saves a contact using the HighLevel API, then enrolls the saved contact in the configured workflow. The original HighLevel form's property address and evaluation goals are mapped to their existing contact custom fields.

Set these environment variables on the server:

| Variable | Value |
| --- | --- |
| `GHL_PRIVATE_INTEGRATION_TOKEN` | Private Integration token with **Contacts Write** access, created in the form's sub-account |
| `GHL_LOCATION_ID` | The form's sub-account ID (`F5UyRGb9N62uJFgPLaxw`) |
| `GHL_WORKFLOW_ID` | ID of the published prospect email, SMS, and Google Sheets workflow |

For local development, store the values in a private env file outside the repository and start Vite with `node --env-file=PATH_TO_PRIVATE_ENV node_modules/vite/bin/vite.js dev`. For hosting, configure the same values as server secrets. Keep the token out of Git and variables prefixed with `VITE_`.

In the workflow, map the prospect email, phone, property address, and evaluation goals from the saved contact. Check the Google account and destination sheet, and enable workflow re-entry if repeat requests should run the actions again. Publish the workflow when the mappings are ready. The same workflow can still handle native HighLevel form submissions through its existing trigger. The website enters it directly by contact ID, so any actions using native form submission data need to use saved contact values for website leads.

Check a controlled submission with a test inbox and phone number, then verify the contact, workflow execution, and sheet row. The site shows confirmation after HighLevel confirms the contact save. If enrollment fails, the contact remains saved and its ID is logged on the server for follow-up.
