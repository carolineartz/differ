require 'csv'
require 'zip'
module ReportingFileDiffer
  class ApplicationController < ActionController::Base
    skip_before_filter :verify_authenticity_token

    before_action :cors_preflight_check
    after_filter :cors_set_access_control_headers

    def show
      render file: Engine.root.join('client', 'build', 'index.html')
    end

    def main
      respond_to do |format|
        format.js { render file: Engine.root.join('client', 'build', 'main.js') }
        format.css { render file: Engine.root.join('client', 'build', 'main.css') }
      end
    end

    def compare
      differ = Differ.for(:csv)
        .config(JSON.parse(params['meta.json']).transform_keys(&:underscore))
        .add(params['file1'].path)
        .add(params['file2'].path)

      result = differ.compare

      render status: :ok, content_type: "application/json", body: { data: result.as_json }.to_json
    end

    def convert
      mode = JSON.parse(params['meta.json'])['mode']

      result = if mode.include?('csv')
                Convert::CSV.new(params['file1.csv'], params['file2.csv']).call
              else
                Convert::Workbook.new(params['file1.xlsx'], params['file2.xlsx']).call
              end
      render status: :ok, content_type: "application/json", body: { data: result.as_json }.to_json
    end

    private

    def cors_set_access_control_headers
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
      headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token'
      headers['Access-Control-Max-Age'] = "1728000"
    end

    def cors_preflight_check
      if request.method == 'OPTIONS'
        headers['Access-Control-Allow-Origin'] = '*'
        headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
        headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-Prototype-Version, Token'
        headers['Access-Control-Max-Age'] = '1728000'

        render :text => '', :content_type => 'text/plain'
      end
    end
  end
end
