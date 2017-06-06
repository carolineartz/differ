require 'csv'
require 'csv-diff'
require 'awesome_print'

module ReportingFileDiffer
  module Compare
    class Workbook
      # WIP
      def initialize(wb1, wb2)
        @wb1 = wb1
        @wb2 = wb2
      end

      def call(options = {})
        wb1_sheets = extract_worksheets(@wb1)
        wb2_sheets = extract_worksheets(@wb2)
        diffs = wb1_sheets.zip(wb2_sheets).map do |sa, sb|
          CSVDiff.new(::CSV.parse(sa), ::CSV.parse(sb), key_fields: ['Flight Start Date', 'Description'], ignore_fields: ['Order ID'])
        end
        diffs.each.with_index(1) do |diff, i|
          puts "Sheet #{i}---------------"
          puts "-- Summary ---------------"
          ap diff.summary
          puts "-- Details ---------------"
          ap diff.diffs
        end
      end

      def extract_worksheets(wb)
        wb.sheets.map do |name|
          wb.default_sheet = name
          wb.to_csv
        end
      end
    end

    class CSV
      def initialize(c1, c2)
        @c1 = c1.to_a
        @c2 = c2.to_a
      end

      # ?? I don't know why this is being weird about hash keys
      def call(options = {})
        CSVDiff.new(@c1, @c2, key_fields: options[:key_fields], ignore_fields: options[:ignore_fields] || [])
      end
    end
  end
end
