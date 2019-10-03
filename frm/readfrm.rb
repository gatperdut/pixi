require 'json'
require 'fileutils'
require 'chunky_png'

def rbytes(format, file, pos)
  file.seek(pos)
  send(format, file)[0]
end

def u32(file)
  file.read(4).unpack('N')
end

def u16(file)
  file.read(2).unpack('n')
end

def u8(file)
  file.read(1).unpack('C')
end

def s16(file)
  file.read(2).unpack('s>')
end

critters = Dir.entries('./raw/critters')
tiles    = Dir.entries('./raw/tiles')

palette = []

File.open('./color.pal') do |file|
  256.times do |i|
    index = {}

    index[:r] = rbytes(:u8, file, i * 3 + 0)
    index[:g] = rbytes(:u8, file, i * 3 + 1)
    index[:b] = rbytes(:u8, file, i * 3 + 2)

    palette << index
  end
end

def process(entry, path, palette)
  File.open("./raw/#{path}/#{entry}") do |file|
    result = {}
    result[:name] = entry.split('.')[0].downcase

    resultdir = "../assets/#{path}/#{result[:name]}"
    unless File.directory?(resultdir)
      FileUtils.mkdir_p(resultdir)
    end

    result[:version]              = rbytes(:u32, file, 0x0)
    result[:fps]                  = rbytes(:u16, file, 0x4)
    result[:action_frame]         = rbytes(:u16, file, 0x6)
    result[:frames_per_direction] = rbytes(:u16, file, 0x8)

    result[:offset] = {}
    result[:offset][:x] = []
    result[:offset][:y] = []
    6.times do |i|
      result[:offset][:x] << rbytes(:s16, file, 0xa + i * 2)
    end
    6.times do |i|
      result[:offset][:y] << rbytes(:s16, file, 0x16 + i * 2)
    end

    frm_offset = []
    6.times do |i|
      frm_offset << rbytes(:u32, file, 0x22 + i * 4)
    end

    frm_data_offset = 0x3E

    result[:data] = []

    6.times do |dir|
      sdf = []

      result[:frames_per_direction].times do |fnum|
        frame = {}

        prevframesoffset = fnum > 0 ? 0xc * fnum + sdf[0..fnum - 1].map{ |e| e[:size] }.inject(0){|sum,x| sum + x } : 0

        frmstart = frm_data_offset + frm_offset[dir] + prevframesoffset

        frame[:width]  = rbytes(:s16, file, frmstart + 0x0)
        frame[:height] = rbytes(:s16, file, frmstart + 0x2)
        frame[:size]   = frame[:width] * frame[:height]

        frame[:offset] = {}
        frame[:offset][:x] = rbytes(:s16, file, frmstart + 0x8)
        frame[:offset][:y] = rbytes(:s16, file, frmstart + 0xa)

        png = ChunkyPNG::Image.new(frame[:width], frame[:height], ChunkyPNG::Color::TRANSPARENT)
        frame[:height].times do |h|
          frame[:width].times do |w|
            index = rbytes(:u8, file, frmstart + frame[:width] * h + w + 0xC)
            palentry = palette[index]
            png[w, h] = ChunkyPNG::Color.rgba(palentry[:r] * 4, palentry[:g] * 4, palentry[:b] * 4, 255) if index > 0 && index < 229
          end
        end
        png.save("#{resultdir}/#{dir}_#{fnum}.png", :interlace => true)

        sdf << frame
      end

      result[:data] << sdf
    end

    File.open("#{resultdir}/data.json", "w") do |file|
      file.puts JSON.pretty_generate(result)
    end
  end
end

critters.each do |critter|
  next if File.directory?(critter)

  process(critter, 'critters', palette)
end

tiles.each do |tile|
  next if File.directory?(tile)

  process(tile, 'tiles', palette)
end
