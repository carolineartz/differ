Rails.application.routes.draw do

  mount ReportingFileDiffer::Engine => "/reporting_file_differ"
end
