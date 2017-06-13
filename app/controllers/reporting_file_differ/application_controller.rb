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

    def convert
      mode = JSON.parse(params['meta.json'])['mode']
      type = mode.include?('csv') ? :csv : :xlsx

      result = Differ.converter.for(type).new(params["file1.#{type}"], params["file2.#{type}"]).call

      render status: :ok, content_type: "application/json", body: { data: result.as_json }.to_json
    end

    def compare
      result = Differ.compare(JSON.parse(params['data.json']))

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
