class PrinterManager:

	def __init__(self, plugin):
		self.plugin = plugin
		self.printer = plugin._printer

	def printFile(self, fileData=None, path=None):
		if fileData:
			if self.plugin.DBManager.isPresent(fileData):
				self.printer.select_file(path=self.plugin.DBManager.getFilePath(fileData['id']), sd=False, printAfterSelect=True)
			else:
				fileData['print_after'] = True
				self.plugin.downloadManager.enqueue(fileData)
		elif path:
			self.printer.select_file(path=path, sd=False, printAfterSelect=True)

	def reportStatus(self):
		return self.printer.get_current_data()

	def connect(self, port=None, baudrate=None, profile=None):
		if self.printer.get_current_connection()[0] == 'Closed':
			self.printer.connect(port=port, baudrate=baudrate, profile=profile)
