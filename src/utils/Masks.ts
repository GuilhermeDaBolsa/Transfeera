import { Mask } from "maska"

const cpfMaskPattern = "###.###.###-##";
const cnpjMaskPattern = "##.###.###/####-##";
const cpfCnpjMaskPatterns = [cpfMaskPattern, cnpjMaskPattern];

const cpfCnpjMask = new Mask({ mask: cpfCnpjMaskPatterns });
const branchMask = new Mask({ mask: ['####', '####-#', '####-##'] });
const accountMask = new Mask({ mask: ['#####-#', '######-#', '#######-#', '########-#', '#########-#', '###########-#'] });

export { cpfMaskPattern, cpfCnpjMaskPatterns, cpfCnpjMask, branchMask, accountMask }