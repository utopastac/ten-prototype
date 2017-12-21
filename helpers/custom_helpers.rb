# Process markdown in templates
module CustomHelpers
	def markdown(text)
		Tilt['markdown'].new { text }.render(scope=self)
	end
end