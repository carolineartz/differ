module ReportingFileDiffer
  class Differ
    def self.compare(*data)
      data.first.map { |d| Compare.new(d).call }
    end

    def self.converter
      Convert
    end
  end
end
