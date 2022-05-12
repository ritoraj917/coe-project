const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    rollNumber: {
        type: Number,
        required: true
    },
    registrationNumber: {
        type: Number,
        required: true
    },
    yearOfRegistration: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    yearOfEnroll: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    firstSemester: [
        {
            subjectOneName: {
                type: String,
                default: null
            },
            subjectOneCode: {
                type: String,
                default: null
            },
            subjectOneCredit: {
                type: Number,
                default: null
            },
            subjectOnePoint: {
                type: Number,
                default: null
            },
            subjectTwoName: {
                type: String,
                default: null
            },
            subjectTwoCode: {
                type: String,
                default: null
            },
            subjectTwoCredit: {
                type: Number,
                default: null
            },
            subjectTwoPoint: {
                type: Number,
                default: null
            },
            subjectThreeName: {
                type: String,
                default: null
            },
            subjectThreeCode: {
                type: String,
                default: null
            },
            subjectThreeCredit: {
                type: Number,
                default: null
            },
            subjectThreePoint: {
                type: Number,
                default: null
            },
            subjectFourName: {
                type: String,
                default: null
            },
            subjectFourCode: {
                type: String,
                default: null
            },
            subjectFourCredit: {
                type: Number,
                default: null
            },
            subjectFourPoint: {
                type: Number,
                default: null
            },
            subjectFiveName: {
                type: String,
                default: null
            },
            subjectFiveCode: {
                type: String,
                default: null
            },
            subjectFiveCredit: {
                type: Number,
                default: null
            },
            subjectFivePoint: {
                type: Number,
                default: null
            }
        }
    ],
    secondSemester: [
        {
            subjectOneName: {
                type: String,
                default: null
            },
            subjectOneCode: {
                type: String,
                default: null
            },
            subjectOneCredit: {
                type: Number,
                default: null
            },
            subjectOnePoint: {
                type: Number,
                default: null
            },
            subjectTwoName: {
                type: String,
                default: null
            },
            subjectTwoCode: {
                type: String,
                default: null
            },
            subjectTwoCredit: {
                type: Number,
                default: null
            },
            subjectTwoPoint: {
                type: Number,
                default: null
            },
            subjectThreeName: {
                type: String,
                default: null
            },
            subjectThreeCode: {
                type: String,
                default: null
            },
            subjectThreeCredit: {
                type: Number,
                default: null
            },
            subjectThreePoint: {
                type: Number,
                default: null
            },
            subjectFourName: {
                type: String,
                default: null
            },
            subjectFourCode: {
                type: String,
                default: null
            },
            subjectFourCredit: {
                type: Number,
                default: null
            },
            subjectFourPoint: {
                type: Number,
                default: null
            },
            subjectFiveName: {
                type: String,
                default: null
            },
            subjectFiveCode: {
                type: String,
                default: null
            },
            subjectFiveCredit: {
                type: Number,
                default: null
            },
            subjectFivePoint: {
                type: Number,
                default: null
            }
        }
    ],
    thirdSemester: [
        {
            subjectOneName: {
                type: String,
                default: null
            },
            subjectOneCode: {
                type: String,
                default: null
            },
            subjectOneCredit: {
                type: Number,
                default: null
            },
            subjectOnePoint: {
                type: Number,
                default: null
            },
            subjectTwoName: {
                type: String,
                default: null
            },
            subjectTwoCode: {
                type: String,
                default: null
            },
            subjectTwoCredit: {
                type: Number,
                default: null
            },
            subjectTwoPoint: {
                type: Number,
                default: null
            },
            subjectThreeName: {
                type: String,
                default: null
            },
            subjectThreeCode: {
                type: String,
                default: null
            },
            subjectThreeCredit: {
                type: Number,
                default: null
            },
            subjectThreePoint: {
                type: Number,
                default: null
            },
            subjectFourName: {
                type: String,
                default: null
            },
            subjectFourCode: {
                type: String,
                default: null
            },
            subjectFourCredit: {
                type: Number,
                default: null
            },
            subjectFourPoint: {
                type: Number,
                default: null
            },
            subjectFiveName: {
                type: String,
                default: null
            },
            subjectFiveCode: {
                type: String,
                default: null
            },
            subjectFiveCredit: {
                type: Number,
                default: null
            },
            subjectFivePoint: {
                type: Number,
                default: null
            }
        }
    ],
    fourthSemester: [
        {
            subjectOneName: {
                type: String,
                default: null
            },
            subjectOneCode: {
                type: String,
                default: null
            },
            subjectOneCredit: {
                type: Number,
                default: null
            },
            subjectOnePoint: {
                type: Number,
                default: null
            },
            subjectTwoName: {
                type: String,
                default: null
            },
            subjectTwoCode: {
                type: String,
                default: null
            },
            subjectTwoCredit: {
                type: Number,
                default: null
            },
            subjectTwoPoint: {
                type: Number,
                default: null
            },
            subjectThreeName: {
                type: String,
                default: null
            },
            subjectThreeCode: {
                type: String,
                default: null
            },
            subjectThreeCredit: {
                type: Number,
                default: null
            },
            subjectThreePoint: {
                type: Number,
                default: null
            },
            subjectFourName: {
                type: String,
                default: null
            },
            subjectFourCode: {
                type: String,
                default: null
            },
            subjectFourCredit: {
                type: Number,
                default: null
            },
            subjectFourPoint: {
                type: Number,
                default: null
            },
            subjectFiveName: {
                type: String,
                default: null
            },
            subjectFiveCode: {
                type: String,
                default: null
            },
            subjectFiveCredit: {
                type: Number,
                default: null
            },
            subjectFivePoint: {
                type: Number,
                default: null
            }
        }
    ],
    fifthSemester: [
        {
            subjectOneName: {
                type: String,
                default: null
            },
            subjectOneCode: {
                type: String,
                default: null
            },
            subjectOneCredit: {
                type: Number,
                default: null
            },
            subjectOnePoint: {
                type: Number,
                default: null
            },
            subjectTwoName: {
                type: String,
                default: null
            },
            subjectTwoCode: {
                type: String,
                default: null
            },
            subjectTwoCredit: {
                type: Number,
                default: null
            },
            subjectTwoPoint: {
                type: Number,
                default: null
            },
            subjectThreeName: {
                type: String,
                default: null
            },
            subjectThreeCode: {
                type: String,
                default: null
            },
            subjectThreeCredit: {
                type: Number,
                default: null
            },
            subjectThreePoint: {
                type: Number,
                default: null
            },
            subjectFourName: {
                type: String,
                default: null
            },
            subjectFourCode: {
                type: String,
                default: null
            },
            subjectFourCredit: {
                type: Number,
                default: null
            },
            subjectFourPoint: {
                type: Number,
                default: null
            },
            subjectFiveName: {
                type: String,
                default: null
            },
            subjectFiveCode: {
                type: String,
                default: null
            },
            subjectFiveCredit: {
                type: Number,
                default: null
            },
            subjectFivePoint: {
                type: Number,
                default: null
            }
        }
    ],
    sixthSemester: [
        {
            subjectOneName: {
                type: String,
                default: null
            },
            subjectOneCode: {
                type: String,
                default: null
            },
            subjectOneCredit: {
                type: Number,
                default: null
            },
            subjectOnePoint: {
                type: Number,
                default: null
            },
            subjectTwoName: {
                type: String,
                default: null
            },
            subjectTwoCode: {
                type: String,
                default: null
            },
            subjectTwoCredit: {
                type: Number,
                default: null
            },
            subjectTwoPoint: {
                type: Number,
                default: null
            },
            subjectThreeName: {
                type: String,
                default: null
            },
            subjectThreeCode: {
                type: String,
                default: null
            },
            subjectThreeCredit: {
                type: Number,
                default: null
            },
            subjectThreePoint: {
                type: Number,
                default: null
            },
            subjectFourName: {
                type: String,
                default: null
            },
            subjectFourCode: {
                type: String,
                default: null
            },
            subjectFourCredit: {
                type: Number,
                default: null
            },
            subjectFourPoint: {
                type: Number,
                default: null
            },
            subjectFiveName: {
                type: String,
                default: null
            },
            subjectFiveCode: {
                type: String,
                default: null
            },
            subjectFiveCredit: {
                type: Number,
                default: null
            },
            subjectFivePoint: {
                type: Number,
                default: null
            }
        }
    ],
    seventhSemester: [
        {
            subjectOneName: {
                type: String,
                default: null
            },
            subjectOneCode: {
                type: String,
                default: null
            },
            subjectOneCredit: {
                type: Number,
                default: null
            },
            subjectOnePoint: {
                type: Number,
                default: null
            },
            subjectTwoName: {
                type: String,
                default: null
            },
            subjectTwoCode: {
                type: String,
                default: null
            },
            subjectTwoCredit: {
                type: Number,
                default: null
            },
            subjectTwoPoint: {
                type: Number,
                default: null
            },
            subjectThreeName: {
                type: String,
                default: null
            },
            subjectThreeCode: {
                type: String,
                default: null
            },
            subjectThreeCredit: {
                type: Number,
                default: null
            },
            subjectThreePoint: {
                type: Number,
                default: null
            },
            subjectFourName: {
                type: String,
                default: null
            },
            subjectFourCode: {
                type: String,
                default: null
            },
            subjectFourCredit: {
                type: Number,
                default: null
            },
            subjectFourPoint: {
                type: Number,
                default: null
            },
            subjectFiveName: {
                type: String,
                default: null
            },
            subjectFiveCode: {
                type: String,
                default: null
            },
            subjectFiveCredit: {
                type: Number,
                default: null
            },
            subjectFivePoint: {
                type: Number,
                default: null
            }
        }
    ],
    eighthSemester: [
        {
            subjectOneName: {
                type: String,
                default: null
            },
            subjectOneCode: {
                type: String,
                default: null
            },
            subjectOneCredit: {
                type: Number,
                default: null
            },
            subjectOnePoint: {
                type: Number,
                default: null
            },
            subjectTwoName: {
                type: String,
                default: null
            },
            subjectTwoCode: {
                type: String,
                default: null
            },
            subjectTwoCredit: {
                type: Number,
                default: null
            },
            subjectTwoPoint: {
                type: Number,
                default: null
            },
            subjectThreeName: {
                type: String,
                default: null
            },
            subjectThreeCode: {
                type: String,
                default: null
            },
            subjectThreeCredit: {
                type: Number,
                default: null
            },
            subjectThreePoint: {
                type: Number,
                default: null
            },
            subjectFourName: {
                type: String,
                default: null
            },
            subjectFourCode: {
                type: String,
                default: null
            },
            subjectFourCredit: {
                type: Number,
                default: null
            },
            subjectFourPoint: {
                type: Number,
                default: null
            },
            subjectFiveName: {
                type: String,
                default: null
            },
            subjectFiveCode: {
                type: String,
                default: null
            },
            subjectFiveCredit: {
                type: Number,
                default: null
            },
            subjectFivePoint: {
                type: Number,
                default: null
            }
        }
    ]
});

studentSchema.methods.addResult1 = async function (subjectOneName, subjectOneCode, subjectOneCredit, subjectOnePoint,
    subjectTwoName, subjectTwoCode, subjectTwoCredit, subjectTwoPoint,
    subjectThreeName, subjectThreeCode, subjectThreeCredit, subjectThreePoint,
    subjectFourName, subjectFourCode, subjectFourCredit, subjectFourPoint,
    subjectFiveName, subjectFiveCode, subjectFiveCredit, subjectFivePoint) {
    try {
        this.firstSemester = this.firstSemester.concat({subjectOneName, subjectOneCode, subjectOneCredit, subjectOnePoint,
            subjectTwoName, subjectTwoCode, subjectTwoCredit, subjectTwoPoint,
            subjectThreeName, subjectThreeCode, subjectThreeCredit, subjectThreePoint,
            subjectFourName, subjectFourCode, subjectFourCredit, subjectFourPoint,
            subjectFiveName, subjectFiveCode, subjectFiveCredit, subjectFivePoint});
        await this.save();
        return this.task;
    } catch(error) {
        console.log(error);
    }
}

studentSchema.methods.addResult2 = async function (subjectOneName, subjectOneCode, subjectOneCredit, subjectOnePoint,
    subjectTwoName, subjectTwoCode, subjectTwoCredit, subjectTwoPoint,
    subjectThreeName, subjectThreeCode, subjectThreeCredit, subjectThreePoint,
    subjectFourName, subjectFourCode, subjectFourCredit, subjectFourPoint,
    subjectFiveName, subjectFiveCode, subjectFiveCredit, subjectFivePoint) {
    try {
        this.secondSemester = this.secondSemester.concat({subjectOneName, subjectOneCode, subjectOneCredit, subjectOnePoint,
            subjectTwoName, subjectTwoCode, subjectTwoCredit, subjectTwoPoint,
            subjectThreeName, subjectThreeCode, subjectThreeCredit, subjectThreePoint,
            subjectFourName, subjectFourCode, subjectFourCredit, subjectFourPoint,
            subjectFiveName, subjectFiveCode, subjectFiveCredit, subjectFivePoint});
        await this.save();
        return this.task;
    } catch(error) {
        console.log(error);
    }
}

studentSchema.methods.addResult3 = async function (subjectOneName, subjectOneCode, subjectOneCredit, subjectOnePoint,
    subjectTwoName, subjectTwoCode, subjectTwoCredit, subjectTwoPoint,
    subjectThreeName, subjectThreeCode, subjectThreeCredit, subjectThreePoint,
    subjectFourName, subjectFourCode, subjectFourCredit, subjectFourPoint,
    subjectFiveName, subjectFiveCode, subjectFiveCredit, subjectFivePoint) {
    try {
        this.thirdSemester = this.thirdSemester.concat({subjectOneName, subjectOneCode, subjectOneCredit, subjectOnePoint,
            subjectTwoName, subjectTwoCode, subjectTwoCredit, subjectTwoPoint,
            subjectThreeName, subjectThreeCode, subjectThreeCredit, subjectThreePoint,
            subjectFourName, subjectFourCode, subjectFourCredit, subjectFourPoint,
            subjectFiveName, subjectFiveCode, subjectFiveCredit, subjectFivePoint});
        await this.save();
        return this.task;
    } catch(error) {
        console.log(error);
    }
}

studentSchema.methods.addResult4 = async function (subjectOneName, subjectOneCode, subjectOneCredit, subjectOnePoint,
    subjectTwoName, subjectTwoCode, subjectTwoCredit, subjectTwoPoint,
    subjectThreeName, subjectThreeCode, subjectThreeCredit, subjectThreePoint,
    subjectFourName, subjectFourCode, subjectFourCredit, subjectFourPoint,
    subjectFiveName, subjectFiveCode, subjectFiveCredit, subjectFivePoint) {
    try {
        this.fourthSemester = this.fourthSemester.concat({subjectOneName, subjectOneCode, subjectOneCredit, subjectOnePoint,
            subjectTwoName, subjectTwoCode, subjectTwoCredit, subjectTwoPoint,
            subjectThreeName, subjectThreeCode, subjectThreeCredit, subjectThreePoint,
            subjectFourName, subjectFourCode, subjectFourCredit, subjectFourPoint,
            subjectFiveName, subjectFiveCode, subjectFiveCredit, subjectFivePoint});
        await this.save();
        return this.task;
    } catch(error) {
        console.log(error);
    }
}

studentSchema.methods.addResult5 = async function (subjectOneName, subjectOneCode, subjectOneCredit, subjectOnePoint,
    subjectTwoName, subjectTwoCode, subjectTwoCredit, subjectTwoPoint,
    subjectThreeName, subjectThreeCode, subjectThreeCredit, subjectThreePoint,
    subjectFourName, subjectFourCode, subjectFourCredit, subjectFourPoint,
    subjectFiveName, subjectFiveCode, subjectFiveCredit, subjectFivePoint) {
    try {
        this.fifthSemester = this.fifthSemester.concat({subjectOneName, subjectOneCode, subjectOneCredit, subjectOnePoint,
            subjectTwoName, subjectTwoCode, subjectTwoCredit, subjectTwoPoint,
            subjectThreeName, subjectThreeCode, subjectThreeCredit, subjectThreePoint,
            subjectFourName, subjectFourCode, subjectFourCredit, subjectFourPoint,
            subjectFiveName, subjectFiveCode, subjectFiveCredit, subjectFivePoint});
        await this.save();
        return this.task;
    } catch(error) {
        console.log(error);
    }
}

studentSchema.methods.addResult6 = async function (subjectOneName, subjectOneCode, subjectOneCredit, subjectOnePoint,
    subjectTwoName, subjectTwoCode, subjectTwoCredit, subjectTwoPoint,
    subjectThreeName, subjectThreeCode, subjectThreeCredit, subjectThreePoint,
    subjectFourName, subjectFourCode, subjectFourCredit, subjectFourPoint,
    subjectFiveName, subjectFiveCode, subjectFiveCredit, subjectFivePoint) {
    try {
        this.sixthSemester = this.sixthSemester.concat({subjectOneName, subjectOneCode, subjectOneCredit, subjectOnePoint,
            subjectTwoName, subjectTwoCode, subjectTwoCredit, subjectTwoPoint,
            subjectThreeName, subjectThreeCode, subjectThreeCredit, subjectThreePoint,
            subjectFourName, subjectFourCode, subjectFourCredit, subjectFourPoint,
            subjectFiveName, subjectFiveCode, subjectFiveCredit, subjectFivePoint});
        await this.save();
        return this.task;
    } catch(error) {
        console.log(error);
    }
}

studentSchema.methods.addResult7 = async function (subjectOneName, subjectOneCode, subjectOneCredit, subjectOnePoint,
    subjectTwoName, subjectTwoCode, subjectTwoCredit, subjectTwoPoint,
    subjectThreeName, subjectThreeCode, subjectThreeCredit, subjectThreePoint,
    subjectFourName, subjectFourCode, subjectFourCredit, subjectFourPoint,
    subjectFiveName, subjectFiveCode, subjectFiveCredit, subjectFivePoint) {
    try {
        this.seventhSemester = this.seventhSemester.concat({subjectOneName, subjectOneCode, subjectOneCredit, subjectOnePoint,
            subjectTwoName, subjectTwoCode, subjectTwoCredit, subjectTwoPoint,
            subjectThreeName, subjectThreeCode, subjectThreeCredit, subjectThreePoint,
            subjectFourName, subjectFourCode, subjectFourCredit, subjectFourPoint,
            subjectFiveName, subjectFiveCode, subjectFiveCredit, subjectFivePoint});
        await this.save();
        return this.task;
    } catch(error) {
        console.log(error);
    }
}

studentSchema.methods.addResult8 = async function (subjectOneName, subjectOneCode, subjectOneCredit, subjectOnePoint,
    subjectTwoName, subjectTwoCode, subjectTwoCredit, subjectTwoPoint,
    subjectThreeName, subjectThreeCode, subjectThreeCredit, subjectThreePoint,
    subjectFourName, subjectFourCode, subjectFourCredit, subjectFourPoint,
    subjectFiveName, subjectFiveCode, subjectFiveCredit, subjectFivePoint) {
    try {
        this.eighthSemester = this.eighthSemester.concat({subjectOneName, subjectOneCode, subjectOneCredit, subjectOnePoint,
            subjectTwoName, subjectTwoCode, subjectTwoCredit, subjectTwoPoint,
            subjectThreeName, subjectThreeCode, subjectThreeCredit, subjectThreePoint,
            subjectFourName, subjectFourCode, subjectFourCredit, subjectFourPoint,
            subjectFiveName, subjectFiveCode, subjectFiveCredit, subjectFivePoint});
        await this.save();
        return this.task;
    } catch(error) {
        console.log(error);
    }
}

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;