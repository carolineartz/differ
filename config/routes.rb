ReportingFileDiffer::Engine.routes.draw do
  get 'diff', to: 'application#show', as: :diff
  get 'diff/main', to: 'application#main'

  post 'diff/compare', to: 'application#compare'
  post 'diff/convert', to: 'application#convert'
end
