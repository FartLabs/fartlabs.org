# fartlabs.org

🧪 Official website of FartLabs.

## Contribute

We appreciate your help!

### Run

Run `deno task generate` to generate the static files. This is required to run
the server because the server serves the generated static files.

Run `deno task start` to start the server.

### Deploy

fartlabs.org runs as the `fartlabs-org` Cloudflare Worker, which serves the
generated files as static assets. It replaced Deno Deploy, which is shutting
down.

Every push to `main` deploys through Cloudflare Workers Builds. The build image
has no Deno, so the build command is
`npm i -g deno@2.9.6 && deno task generate`, followed by `npx wrangler deploy`.
To deploy by hand:

```sh
deno task generate
npx wrangler deploy
```

### Style

Run `deno fmt` to format the code.

Run `deno lint` to lint the code.

Run `deno check main.ts` to check the code.

Or, run `deno task precommit` to run all the checks before committing.

---

Developed with 🧪 [**@FartLabs**](https://github.com/FartLabs)
