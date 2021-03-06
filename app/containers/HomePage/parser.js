import { INSTRUCTIONS, EMPTY } from './constants'
import spec_instructions from './cpu/instructions/index'

export default function getInstructions(text){
		const parsed_instructions = parse(text)
		if (parsed_instructions === null || checkOnlyEmptyLines(parsed_instructions))
			return {valid: false, annotations:[{text: `Insert Instructions`}]}
		let verify = verifyInstructions(parsed_instructions)
		if(!verify.valid)
			return verify
		parsed_instructions.unshift(EMPTY) // add empty element to the beginning to have each instruction on the same index as on line in editor
		return parsed_instructions
}

/*
 * @param {text} text from ace editor
 * @return {null/instructions}
 * 	 null - param text is empty,
 * 	 instructions - Array of instructions
 *  {instruction: String, params: String[]}[] 
 */
export function parse(text){
	const instruction_pos = 0
	const instruction_offset = 1
	try{
		if (!isEmpty(text)) {
      let parsed = []
      // remove empty lines from beginning/end and split them at new line
      text.trim().split('\n').map((line) => { 
        const removed_comment = removeComments(line)
        line = removed_comment
				if(!isEmpty(line)) // ignore empty lines
				{
					let space_splited = line.split(' ')
					//remove empty spaces and trim each word
					space_splited = space_splited
						.filter((word) => {
							if (!isEmpty(word))
								return true
							return false
						}).map((word) => word.trim())
					parsed.push({
						instruction: space_splited[instruction_pos].toUpperCase(),
						params:space_splited.slice(instruction_offset)
					})
				}
        else { // line is empty
          parsed.push(EMPTY)
        }
			})
			return parsed
		}
		else
      return null // no text inserted
	}
	catch (err){ 
		console.error(err)
	}
	return null
}	

/*
 * @param { {instruction: String, params: String[]}[] } instructions - array of objects which
 * @param {{String: Number}} rules - rules for all instructions
 * @return {{valid: Boolean, annotations: Array[]}} - bool represents validity of code an annotations error messages for notification report
 */
export function verifyInstructions(instructions, rules=INSTRUCTIONS){
	let annotations = []
	instructions.forEach((instr, line) => {
    if(instr === EMPTY)
      return // dont check empty lines
		const instruction_name = instr.instruction.toUpperCase()
		if(instruction_name in rules){ 
			if(instr.params.length === rules[instruction_name]) {
				const check = spec_instructions[instruction_name].checkParams(instr.params, instructions.length)
        if(typeof check === 'string') // string message or false, eg. ERROR
					annotations.push({line: line+1, text: `${check}`})
        if(check === false)
          annotations.push({line: line+1, text: `Wrong params for ${instruction_name} instruction`})
			}
			else { // wrong format of parameter
				annotations.push({line: line+1, text: `Instruction ${instruction_name} uses ${rules[instruction_name]} params, inserted are ${instr.params.length}`})
			}
		}
		else { // unknown instuction
			annotations.push({line: line+1, text: "Unknown Instruction"})
		}
	})
	if (annotations.length === 0)
		return {valid: true, annotations}
	return {valid: false, annotations}
}

/*
 * @param {String} - controled string
 * @throws {TypeError} - if params is not string
 * @return {Boolean}
 */
export function isEmpty(str){
	if (typeof(str) !== 'string')
		throw TypeError("isEmpty takes string as parameter not " + typeof(str))
	const zero_length = 0
	return (str.length === zero_length || !str.trim())
}

/*
 * @desc removes comment from line
 * @param {String} line - handled line
 * @return {String} - line without comment, or unchanged when comment wasn't there
 */
export function removeComments(line){
  return line.replace(/#.*$/g, '')
}

export function checkOnlyEmptyLines(parsed_text){
  return parsed_text.every(line => line === EMPTY)
}
