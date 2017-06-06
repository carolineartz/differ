require 'roo'
require 'csv'

module ReportingFileDiffer
  class Differ
    def self.for(type)
      @builder = {
        type: type,
        file_data: []
      }
      @builder[:comparer] = case type
                            when :csv then Compare::CSV
                            when :xslx then Compare::Workbook
                            end
      self
    end

    def self.config(options)
      @builder[:options] = options.with_indifferent_access
      self
    end

    def self.add(entry)
      case @builder[:type]
      when :csv
        @builder[:file_data] << ::CSV.read(entry)
      when :xlsx
        @builder[:file_data] << Roo::Excelx.new(entry)
      end
      self
    end

    def self.compare
      @builder[:comparer].new(*@builder[:file_data].first(2)).call(@builder[:options])
    end
  end
end
