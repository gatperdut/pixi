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