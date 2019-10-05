require 'json'
require 'fileutils'
require 'chunky_png'

require './_palette'
require './_headertile'
require './_frame'

ifaceelems = Dir.entries('../raw/iface')

def process(entry)
  palette = rpalette

  result = {}
  result[:name] = entry

  resultdir = "../../assets/iface/#{result[:name]}"
  unless File.directory?(resultdir)
    FileUtils.mkdir_p(resultdir)
  end

  File.open("../raw/iface/#{entry}") do |file|
    result[:header] = rheadertile(file)

    result[:frame] = rframe(result[:header], resultdir, file, 0, 0, palette, [])

    File.open("#{resultdir}/data.json", "w") do |file|
      file.puts JSON.pretty_generate(result)
    end
  end
end

ifaceelems.each do |ifaceelem|
  next if File.directory?(ifaceelem)

  process(ifaceelem)
end
