var sentence_templates_easy = [
  "the {{ noun }} is {{ adjective }}",
  "hello {{ noun }}",
  "you are {{ adjective }}",
  "what does it mean to be {{ adjective }}"
];

var sentence_templates_medium = [
  "I am a {{ adjective }}, {{ adjective }} person.",
  "They told him \"{{ a_noun}} is too {{ adjective }}!\" ",
  "Yesterday I had {{ in_range(5, 10) }} {{ nouns }}, today I have {{ in_range(2, 4) }}, tomorrow I'll probably have none!",
  "{{ name }} almost forget their {{ adjective }} {{ noun }} at home!"
];

var sentence_templates_hard = [
  "{{ name }} & {{ name }} are having a really {{ adjective }} time.",
  "What's {{ name }}'s phone #?",
  "omg! {{ name }} just sent me a text that said: {{ emoticon }}",
  "After winning this bet, {{ name }} will owe me ${{ in_range(1,1000) }}",
  "My computer says that {{ equation }} but I don't believe it."
];

module.exports = {
  easy   : sentence_templates_easy,
  medium : sentence_templates_medium,
  hard   : sentence_templates_hard
}
