require './_bytes'

def rheadercritter(file)
  result = {}

  result[:version]              = rbytes(:u32, file, 0x0)
  result[:fps]                  = rbytes(:u16, file, 0x4)
  result[:action_frame]         = rbytes(:u16, file, 0x6)
  result[:frames_per_direction] = rbytes(:u16, file, 0x8)

  result[:offsets] = {}
  result[:offsets][:x] = []
  result[:offsets][:y] = []
  6.times do |i|
    result[:offsets][:x] << rbytes(:s16, file, 0xa + i * 2)
  end
  6.times do |i|
    result[:offsets][:y] << rbytes(:s16, file, 0x16 + i * 2)
  end

  result[:frm_offsets] = []
  6.times do |i|
    result[:frm_offsets] << rbytes(:u32, file, 0x22 + i * 4)
  end

  result
end