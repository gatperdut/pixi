require 'json'
require 'fileutils'
require 'chunky_png'

require './_palette'
require './_headercritter'
require './_frame'

critters = Dir.entries('../raw/critters')


def process(entry)
  palette = rpalette

  result = {}
  result[:name] = entry.split('.')[0].downcase

  resultdir = "../../assets/critters/#{result[:name]}"
  unless File.directory?(resultdir)
    FileUtils.mkdir_p(resultdir)
  end

  File.open("../raw/critters/#{entry}") do |file|
    result[:header] = rheadercritter(file)
    result[:frames] = []

    6.times do |direction|
      sdf = []
      result[:header][:frames_per_direction].times do |fnum|
        frame = rframe(result[:header], resultdir, file, fnum, direction, palette, sdf)

        sdf << frame
      end
      result[:frames] << sdf
    end

    File.open("#{resultdir}/data.json", "w") do |file|
      file.puts JSON.pretty_generate(result)
    end
  end
end

critters.each do |critter|
  next if File.directory?(critter)

  process(critter)
end
