require 'csv'
require 'csv-diff'

module ReportingFileDiffer
  class Compare
    def initialize(data_set)
      @data1 = data_set['data1']['data'] || {}
      @data2 = data_set['data2']['data'] || {}
      @opts = {
        key_fields: data_set['keyFields'] || [],
        ignore_fields: data_set['ignoreFields'] || []
      }
    end

    def call
      CSVDiff.new(@data1, @data2, @opts)
    end
  end
end
