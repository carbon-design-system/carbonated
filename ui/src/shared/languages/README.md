# `src/shared/languages`

This directory holds all of the languages that the app currently supports for i18n. Inside of each language directory, there are all the locales that we support with a fallback value to the specific language if we don't have anything else available.

For example, English is represented as `en` for the language, and English localized for the United States is abbreviated as `en-US`. In this directory, this is organized as `src/client/languages/en` for the directory of locales for the English language.

A specific locale would be available as a `yml` file, for example: `src/client/langauges/en/en-US.yml`. The fallback `yml` file for the given
language would be at `src/client/languages/en/en.yml`.

## Resources

For i18n, we currently use a project called [`react-intl`](https://github.com/yahoo/react-intl) and load in the locale-specific data on-demand. The message syntax we use is [ICU](https://formatjs.io/guides/message-syntax/), and is defined in the `yml` files that we mentioned earlier.
