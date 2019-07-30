# Husky

This project uses [Husky](https://github.com/typicode/husky#readme) for enforcing git hooks.

## Configuration

Husky is configured entirely by `.huskyrc.json`

It supports all of the git hooks found [here](https://git-scm.com/docs/githooks)

## Hooks Used

A variety of git hooks are used, and more can be implemented via a PR. To skip the execution of the hooks for whatever reason, add the flag `--no-verify` to the end of your git command that would other proc the hook.

### Pre Commit

- ES Lint is ran for both the UI and the API before committing.
