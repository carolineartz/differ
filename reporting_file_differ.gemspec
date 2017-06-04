$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "reporting_file_differ/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "reporting_file_differ"
  s.version     = ReportingFileDiffer::VERSION
  s.authors     = ["Caroline Artz"]
  s.email       = ["ceartz@gmail.com"]
  s.homepage    = "http://centro.net"
  s.summary     = "Summary of ReportingFileDiffer."
  s.description = "Description of ReportingFileDiffer."
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]

  s.add_dependency "rails", "~> 4.2.7.1"
  s.add_dependency 'puma'
  s.add_dependency 'roo'
  s.add_dependency 'csv-diff'
  s.add_dependency 'awesome_print'
  s.add_dependency 'rubyzip'

  s.add_development_dependency "pg"
  s.add_development_dependency 'rspec-rails'
end
