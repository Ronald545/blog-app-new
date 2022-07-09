dev: 
	concurrently "npm run dev --prefix=frontend" "npm run dev --prefix=graphql"

build:
	npm run build --prefix=frontend && npm run build --prefix=graphql

start:
	concurrently "npm run preview --prefix=frontend" "npm run start --prefix=graphql"
