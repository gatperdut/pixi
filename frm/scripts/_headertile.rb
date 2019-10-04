require './_bytes'

def rheadertile(file)
  result = {}

  result[:version] = rbytes(:u32, file, 0x0)

  result[:offsets] = {}
  result[:offsets][:x] = [rbytes(:s16, file, 0xa)]
  result[:offsets][:y] = [rbytes(:s16, file, 0x16)]
  result[:frm_offsets] = [rbytes(:u32, file, 0x22)]

  result
end