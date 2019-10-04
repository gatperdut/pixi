require './_bytes'
require './_palette'

def rframe(header, resultdir, file, fnum, direction, palette, sdf)
  frame = {}

  frm_data_offset = 0x3E

  prevframesoffset = fnum > 0 ? 0xc * fnum + sdf[0..fnum - 1].map{ |e| e[:size] }.inject(0){|sum,x| sum + x } : 0

  frmstart = frm_data_offset + header[:frm_offsets][direction] + prevframesoffset

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
  png.save("#{resultdir}/#{direction}_#{fnum}.png", :interlace => true)

  frame
end