require 'roo'
require 'csv'

module ReportingFileDiffer
  class Differ
    def self.for(type)
      @opts = {
        type: type,
        file_data: []
      }
      @opts[:comparer] = case type
                         when :csv then Compare::CSV
                         when :xslx then Compare::Workbook
                         end
      self
    end

    def self.add(entry)
      case @opts[:type]
      when :csv
        @opts[:file_data] << ::CSV.new(entry)
      when :xlsx
        @opts[:file_data] << Roo::Excelx.new(entry)
      end
      self
    end

    def self.compare
      @opts[:comparer].new(*@opts[:file_data].first(2)).call
    end
  end
end
