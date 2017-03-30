import { FIRST_OPERAND, SECOND_OPERAND, THIRD_OPERAND } from '../constants'

export function fetch_template(instruction){
	return `Instruction ${instruction} fetched, PC incremented`
}
export function decode_template(instruction){
	return `Instruction ${instruction} decoded`
}
export function execute_template(instruction){
	return `Executed ${instruction.instruction} instruction, 
	${instruction.params[FIRST_OPERAND]} = ${instruction.params[SECOND_OPERAND]} + ${instruction.params[THIRD_OPERAND]}`
}
export function memaccess_template(instruction, is_accssed){
	if(is_accssed)
		return `Instruction ${instruction} has accessed memory`
	else
		return `Instruction ${instruction} is forwarded to the next stage without accessing memory` 
}
export function writeback_template(instruction, result, destination){
	return `Instruction ${instruction} has written ${result} into ${destination}`
}

export function registerChange(register){
	return {name: register, animation_on: false}
}