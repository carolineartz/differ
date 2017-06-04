ReportingFileDiffer::Engine.routes.draw do
  get 'diff', to: 'application#show', as: :diff
  get 'diff/main', to: 'application#main'

  post 'diff/upload', to: 'application#upload'
  post 'diff/upload-csv', to: 'application#upload_csv'
  post 'diff/upload-xlsx', to: 'application#upload_xlsx'
end
