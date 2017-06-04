require 'csv'
require 'csv-diff'
require 'awesome_print'

module ReportingFileDiffer
  module Compare
    class Workbook
      def initialize(wb1, wb2)
        @wb1 = wb1
        @wb2 = wb2
      end

      def call
        binding.pry
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
      KEY_FIELDS = {
        client: ['START_DATE', 'PLACEMENT'],
        vendor: ['LINE_DATE', 'ORDER_LINE_NBR']
      }
      CLIENT_FIELD_NAMES = ['ORDER_ID', 'ORDER_DESC', 'VN_CODE', 'VN_NAME', 'BUYER', 'CLIENT', 'CL_NAME', 'DIVISION', 'PRODUCT', 'SALES_CLASS', 'CAMPAIGN', 'MARKET', 'MARKET_DESC', 'CLIENT_PO', 'REP_CODE1', 'REP_CODE2', 'NET_GROSS', 'ORDER_COMMENT', 'LINE_NBR', 'HEADLINE', 'AD_NUMBER', 'AD_NBR_DESC', 'URL', 'CREATIVE_SIZE_CODE', 'CREATIVE_SIZE_DESC', 'COPY', 'TARGET_AUD', 'PLACEMENT', 'PLACEMENT_2', 'INTERNET_TYPE_CODE', 'LINE_COMMENT', 'JOB_NUMBER', 'COMPONENT_NBR', 'START_DATE', 'END_DATE', 'SPACE_CLOSE', 'MATERIAL_CLOSE', 'COST_TYPE', 'RATE', 'PROJ_IMPRESSIONS', 'GUAR_IMPRESSIONS', 'ACTUAL_IMPRESSIONS', 'COST', 'OTHER_NET', 'REVISE_FLAG', 'INSERT_STATUS', 'ADD_AMT', 'MARKUP_PCT', 'REBATE_PCT', 'REBATE_AMT', 'PLAN_IDS', 'SOURCE_CODE']

      def initialize(c1, c2)
        @c1 = c1.to_a
        @c2 = c2.to_a
      end

      def call
        CSVDiff.new(@c1, @c2, **options)
      end

      def type
        @c1.first.all? ? :vendor : :client
      end

      def options
        opts = { key_fields: KEY_FIELDS[type], ignore_fields: ['ORDER_ID', 'LINE_NBR'] }
        return opts if type == :vendor
        opts.merge(field_names: CLIENT_FIELD_NAMES)
      end
    end
  end
end
