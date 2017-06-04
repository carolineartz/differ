# Reporting File Differ Frontend

## Developing

    > foreman start

In a browser go to http://localhost:3002/

### How this works?

Browser -> Webpack Dev Server -> Rails Server

## Building for production

    > yarn build
    > cd "where your rails app using reporting file differ"
    > bundle exec rails server

In a browser go to http://localhost:3000/reporting_file_differ/diff
