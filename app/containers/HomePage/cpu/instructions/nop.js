import * as ui_template from '../ui_templates'

export function checkParams(){
  return true
}
export function fetch(instruction, registers, ui){
	ui.addTo(ui_template.fetch_template(instruction.instruction), 'state_line_msg')
}
export function decode(instruction, registers, ui){
	ui.addTo(ui_template.decode_template(instruction.instruction), 'state_line_msg')
}
export function execute(instruction, registers, ui){
	ui.addTo(`Nothing to be done with NOP instruction`, 'state_line_msg')
}
export function memaccess(instruction, registers, ui){
	ui.addTo(ui_template.memaccess_template(instruction.instruction, false), 'state_line_msg')
}
export function writeback(instruction, registers, ui){
	ui.addTo(`NOP instruction has just passed through writaback stage`, 'state_line_msg')
}

export default {
	checkParams,
	fetch,
	decode,
	execute,
	memaccess,
	writeback
}
