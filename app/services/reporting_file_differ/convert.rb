require 'csv'
require 'roo'

module ReportingFileDiffer
  module Convert
    # TODO: error handle
    def self.for(type)
      if type === :csv
        CSV
      else
        Workbook
      end
    end

    class Workbook
      def initialize(wb1, wb2)
        @wb1 = wb1
        @wb2 = wb2
      end

      def call
        {
          workbooks: [@wb1.original_filename, @wb2.original_filename],
          sheets: sheets
        }
      end

      def sheets
        workbook1 = Roo::Excelx.new(@wb1.path)
        workbook2 = Roo::Excelx.new(@wb2.path)
        workbook1.sheets.each_with_object([]) do |name, sheet_data|
          sheet_data << {
            name: name,
            @wb1.original_filename => workbook1.tap { |wb| wb.default_sheet = name }.to_csv,
            @wb2.original_filename => workbook2.tap { |wb| wb.default_sheet = name }.to_csv
          }
        end
      end
    end

    class CSV
      def initialize(file1, file2)
        @file1 = file1
        @file2 = file2
      end

      def call
        {
          workbooks: [@file1.original_filename, @file2.original_filename],
          sheets: [{
            @file1.original_filename => ::CSV.open(@file1.path).read.map { |x| x.join(',') }.join("\n"),
            @file2.original_filename => ::CSV.open(@file2.path).read.map { |x| x.join(',') }.join("\n")
          }]
        }
      end
    end
  end
end
