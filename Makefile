REPORTER = spec
test: lint
	@TZ=UTC NODE_ENV=test ./node_modules/.bin/mocha -r should -b --reporter $(REPORTER)

lint:
	./node_modules/.bin/jshint ./lib ./test ./c-base-pos.js

test-cov-html: test
	@TZ=UTC NODE_ENV=test ./node_modules/.bin/mocha \
		--require blanket \
		--require should \
		--reporter html-cov > coverage.html.new \
	&& cat coverage.html.new > coverage.html \
	&& rm coverage.html.new
	@# avoiding an empty (hardlinked) coverage file between runs

test-cov: test
	@echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@TZ=UTC NODE_ENV=test ./node_modules/.bin/mocha \
		--require blanket \
		--require should \
		--reporter mocha-lcov-reporter > lcov.info
	@ ./node_modules/coveralls/bin/coveralls.js < lcov.info
	@ ./node_modules/.bin/codacy-coverage < lcov.info
	@ ./node_modules/.bin/codeclimate-test-reporter < lcov.info

.PHONY: test
