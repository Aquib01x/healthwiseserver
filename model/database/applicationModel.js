const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [
      'Text', 'Paragraph', 'Image', 'ListItem', 'LinkButton',
      'DateComponent', 'PlacementQuiz', 'InteractiveQuiz', 
      'GoalSetting', 'DecisionalBalanceSheet', 'SuccessfulGoalsReminder',
      'AlternativeActivityGenerator', 'EvaluationQuiz', 'EvaluationResults'
    ]
  },
  content: mongoose.Schema.Types.Mixed, // This allows flexible content structure based on component type
});

const appSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
 

  home: { components: [componentSchema] },
  guidelines: { components: [componentSchema] },
  precontemplation: { components: [componentSchema] },
  contemplation: { components: [componentSchema] },
  preparation: { components: [componentSchema] },
  action: { components: [componentSchema] },
  maintenance: { components: [componentSchema] }
}, { timestamps: true });

module.exports = mongoose.model('App', appSchema);
