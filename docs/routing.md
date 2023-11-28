# Routing for Remix Run

One thing I like about Remix Run is how the file structure in the `app/routes` directory is also the routes structure

Opting to use [remix-flat-routes](https://github.com/kiliman/remix-flat-routes) for a more maintainable organization of files than the out-of-the-box "dot" filename structure

The filenaming structure for this is also a bit tricky so here's a few tips:

- to create a folder but treat it as a flat-file, just append the `+` to the folder name
- any file that has a `_` prefix will be treated as the route file ([source](https://github.com/kiliman/remix-flat-routes)) which can then use the `<Outlet />` component to render child routes ([source](https://remix.run/docs/en/main/components/outlet))

## Resources

- [Route Configuration](https://remix.run/docs/en/main/discussion/routes)
- [Route File Naming](https://remix.run/docs/en/main/file-conventions/routes)
