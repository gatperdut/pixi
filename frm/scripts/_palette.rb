require './_bytes'

def rpalette
  palette = []
  File.open('../color.pal') do |file|
    256.times do |i|
      index = {}

      index[:r] = rbytes(:u8, file, i * 3 + 0)
      index[:g] = rbytes(:u8, file, i * 3 + 1)
      index[:b] = rbytes(:u8, file, i * 3 + 2)

      palette << index
    end
  end

  palette
end