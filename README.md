# Language Used
JavaScript (runtime environment: Nodejs)

# Use command to install modules

```
  npm i
```

# To run the code

```
   npm start
```

# Explanation
The overall sentiment score of this file is 68% Positive. This sentiment score means that the file is positive overall, and 68% of the words that hold either positive or negative connotations are positive. The sentiment score generated by this algorithm is similar to the score I expected (slightly higher than 50%), as the first half of the text is slightly negative (a person having a dream of having a debate/argument with another), while the rest are relatively positive (especially how the last paragraph of text is describing a person's character positively).

The score is determined by scanning the input file and comparing each word with a list of positive and negative words. The list of positive and negative words are also scanned from txt files. For every positive or negative word, the respective variable (positiveScore, negativeScore) will be incremented (Note, neutral words or words that do not appear in the positive/negative lists will be counted as neutral, and neither the positive nor the negative variable will be incremented). Once the whole input file has been scanned through, the more "dominant" sentiment type will be selected (positive/negative) and its percentage will be calculated.

# Evaluation
### Strengths 
The solution is straightforward and easy to understand compared to the algorthims that already exist such as LIWC. Uses encapsulation that makes the code clearer and readable to the user. The sentiment score outputted by the solution is easy to understand.

### Weaknesses 
The solution's outputted sentiment score is vague and non-specific. The lexicon used is very binary compared to other lexicons (such as the VADER Lexicon and LIWC Dictionary). Solution is not fully optimized. The database of negative/positive words is limited. The solution only focuses on individual words, and does not address the complexities of language such as expressions that may contain sarcasm or jokes.

### Future/Possible improvements
A possible improvement that addresss the solution's vague/non-specific sentiment score is by implementing more complex lexicons (i.e. LIWC Dictionary), more specific emotions within each sentiment, and statistical models such as logistical regression. Another possible improvement is to optimize the solution.


# Citations
### Modules used
  -`stemmer (Titus Wormer)`

  -`fs`
### Libraries used
  Minqing Hu and Bing Liu. "Mining and Summarizing Customer Reviews." 
    Proceedings of the ACM SIGKDD International Conference on Knowledge 
    Discovery and Data Mining (KDD-2004), Aug 22-25, 2004, Seattle, 
    Washington, USA, 
