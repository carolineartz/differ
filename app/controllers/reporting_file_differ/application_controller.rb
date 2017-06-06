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

    def upload_csv
      differ = Differ.for(:csv)
        .config(JSON.parse(params['meta.json']).transform_keys(&:underscore))
        .add(params['file1.csv'].path)
        .add(params['file2.csv'].path)

      result = differ.compare

      render status: :ok, content_type: "application/json", body: { data: result.as_json }.to_json
    end

    def updload_xlsx
      # @@files << request.body
      # binding.pry
      # Differ.for(:xlsx).new(*@@files).call if @@files.compact.size == 2
      # binding.pry if @@files.compact.size == 2
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
