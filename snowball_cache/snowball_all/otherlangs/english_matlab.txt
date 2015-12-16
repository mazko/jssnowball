function w = porterStemmer2(w)
   %
   % BSD license. Daniel Jablonski jablodan@gmail.com Based on work done and
   % shared on http://tartarus.org/~martin/PorterStemmer/
   %
   % This is implementation of Porter 2 as presented here
   % http://snowball.tartarus.org/algorithms/english/stemmer.html
   % No exceptions are impemented.
   %
   % This matlab implementation is based on great previous one done by Juan
   % Carlos Lopez http://tartarus.org/~martin/PorterStemmer/matlab.txt it
   % is slightly faster (13-33%) when using test words here
   % http://snowball.tartarus.org/algorithms/english/diffs.txt and about
   % 33% faster when used in real life text form a book with 124'370 words
   % - mainly due to the fact that smaller words (less than 6 letters) are
   % handled little bit more effectively, skipping some argument passing
   % etc. This implementation does not use global variables. One can not
   % compare these two implementation 1:1 because set of rules is
   % different. These was measured with tic, toc and calling cellfun.
   %
   % I have also used frequency of bigrams presented here
   % http://www.cs.cmu.edu/afs/cs.cmu.edu/project/listen/NLP/
   % Parsers/Stanford/stanford-parser-2005-07-21/MCALL/tsurgeon/MCALL/
   % WordNet/prolog/misc/PREFIXES/BAR120.pdf
   % to reorder switch case conditions so that more freqent ones are
   % checked first.
   
   l = length(w);
   j=l;
   eaiou='eaiou';
   
   if l<3, return, end
   if (w(1)==''''), w(1)=''; l=l-1; end
   if (e('''s''',3) || e('''s',2) || e('''',1)), l=j; w=w(1:l); end
   step1a();
   if (l<3), return, end
   step1b();
   step1c();
   step2();
   step3();
   step4();
   step5();
   
   function tf = c(b,x)
      tf=true;
      for q=1:5
         if b==eaiou(q),tf=false;return,end
      end
      if b=='y'
         if (x==1),tf=true;
         else tf=v(w(x-1),x-1);
         end
      end
   end
   function tf = v(b,x)
      tf=false;
      for q=1:5
         if eaiou(q)==b,tf=true;return,end
      end
      if b=='y'
         if (x==1),tf=false;
         else tf=c(w(x-1),x-1);
         end
      end
   end
   function n = m1()
      n=0;
      x=1;
      while true
         if (x > j), return,end
         if v(w(x),x), break; end
         x=x+1;
      end
      x=x+1;
      while true
         while true
            if (x > j), return,end
            if c(w(x),x), break; end
            x=x+1;
         end
         n=n+1; %%
         return
      end
   end
   function n = m2()
      n=0;
      x=1;
      while true
         if (x > j), return,end
         if v(w(x),x), break; end
         x=x+1;
      end
      x=x+1;
      while true
         while true
            if (x > j), return,end
            if c(w(x),x), break; end
            x=x+1;
         end
         x=x+1;
         n=n+1;
         if n==2, return, end
         while true
            if (x > j), return, end
            if v(w(x),x), break; end
            x=x+1;
         end
         x=x+1;
      end
   end
   function tf = vis()
      lastvowel=false;
      for x=1:j
         switch w(x)
            case { 'e', 'a', 'i', 'o', 'u'} % eaiouy
               tf=true;
               return
            case {'y'}
               tf=lastvowel;
            otherwise
               tf=false;
         end
         if tf
            return
         end
         lastvowel=~tf;
      end
      tf=false;
   end
   function tf = c2()
      if (l<2)
         tf=false;
         return
      end
      if (w(l) ~= w(l-1))
         tf=false;
         return
      end
      tf=c(w(l),l);
   end
   function tf = cvc(x)
      tf=false;
      if ~((x < 3) || v(w(x),x) || c(w(x-1),x-1) || v(w(x-2),x-2))
         if (w(x) == 'w' || w(x) == 'x' || w(x) == 'y')
            tf=false;
            return
         end
         tf=true;
      elseif ~((x~=2) || c(w(1),1) || v(w(2),2))
         tf=true;
         return
      elseif x==1
         tf=true;
         return
      end
   end
   function tf = e(str, sl)
      tf=false;
      if ((str(sl) ~= w(l)) || (sl >= l)), return, end
      if strcmp(w(l-sl+1:l-1), str(1:sl-1))
         j=l-sl;
         tf=true;
         return
      end
   end
   function tf = elc(str, sl)
      tf=false;
      if (sl >= l), return, end
      if strcmp(w(l-sl+1:l-2), str(1:sl-2))
         j=l-sl;
         tf=true;
         return
      end
   end
   function setto(s,sl)
      l=j+sl;
      w(j+1:l)=s;
      w((l+1):end)='';
   end
   function rs(str, sl)
      if (m1() > 0), setto(str,sl); end
   end
   function step1a()
      if (e('us',2) || e('ss',2)), return,
      elseif e('sses',4), l=l-2;
      elseif (e('ies',3) || e('ied',3))
         if l==4, l=l-1;
         else l=l-2;
         end
      elseif w(l)=='s',
         for x=1:l-2
            if v(w(x),x), l=l-1; break, end
         end
      end
      w=w(1:l);
   end
   function step1b()
      if (e('eed',3) || e('eedly',5))
         rs('ee',2);
      elseif ((e('ed',2)||e('ing',3)||e('edly',4)||e('ingly',5)) && vis())
         l=j;
         w=w(1:l);
         if e('at', 2)
            setto('ate', 3);
         elseif e('bl', 2)
            setto('ble', 3);
         elseif e('iz', 2)
            setto('ize', 3);
         elseif c2()
            l=l-1;
            if ((w(l) == 'l') || (w(l) == 's') || (w(l) == 'z'))
               l=l+1;
            end
            w=w(1:l);
         elseif (m2()==1 && cvc(l))||(l==1)
            setto('e',1);
         end
      end
   end
   function step1c()
      if (e('y',1) && c(w(l-1),l-1) && (l~=2))
         w(l)='i';
      end
   end
   function step2()
      % er 13.9
      % on 13.6
      % or 13.4
      % ti 13.2
      % al 13.1
      % li 12.7
      % ss 12.2
      % ci 11.7
      % gi 11.0
      % sm 10.1
      if (l<4), return, end
      
      switch w(l-1:l)
         case {'er'}
            if elc('izer',4), rs('ize',  3); end
         case {'on'}
            if elc('ization',  7), rs('ize',  3);
            elseif elc('ation',    5), rs('ate',  3);
            end
         case {'or'}
            if e('ator',     4), rs('ate',  3); end
         case {'ti'}
            if e('biliti',   6), rs('ble',  3);
            elseif e('aliti',    5), rs('al',   2);
            elseif e('iviti',    5), rs('ive',  3);
            end
         case {'al'}
            if e('ational',  7), rs('ate',  3);
            elseif e('tional',   6), rs('tion', 4);
            end
         case {'li'}
            if e('abli',      4), rs('able',  4);
            elseif e('bli',      3), rs('ble',  3);
            elseif e('alli',     4), rs('al',   2);
            elseif e('entli',    5), rs('ent',  3);
            elseif e('fulli',    5), rs('ful',  3);
            elseif e('lessli',   6), rs('less', 4);
            elseif e('eli',      3), rs('e',    1);
            elseif e('ousli',    5), rs('ous',  3);
            else j=l-2; % if e('li',       2),
               if (...
                     w(j)=='e'||w(j)=='c'||w(j)=='r'||w(j)=='t'||...
                     w(j)=='n'||w(j)=='g'||w(j)=='d'||w(j)=='k'||...
                     w(j)=='h'||w(j)=='m')
                  % el 12.4
                  % cl 11.4
                  % rl 10.8
                  % tl 10.7
                  % nl 10.1
                  % gl 9.99
                  % dl 9.76
                  % kl 9.22
                  % hl 9.00
                  % ml 7.21
                  % by http://www.cs.cmu.edu/afs/cs.cmu.edu/project/listen/NLP/Parsers/Stanford/stanford-parser-2005-07-21/MCALL/tsurgeon/MCALL/WordNet/prolog/misc/PREFIXES/BAR120.pdf
                  rs('',0);
               end
            end
         case {'ss'}
            if e('iveness',  7), rs('ive',  3);
            elseif e('fulness',  7), rs('ful',  3);
            elseif e('ousness',  7), rs('ous',  3);
            end
         case {'ci'}
            if e('enci',     4), rs('ence', 4);
            elseif e('anci',     4), rs('ance', 4);
            end
         case {'gi'}
            if (e('ogi',3)&&(w(j)=='l')), rs('og',  2); end
         case {'sm'}
            if e('alism',    5), rs('al',   2);end
      end
      j=l;
   end
   function step3()
      % er 13.9
      % on 13.6
      % or 13.4
      % te 13.3
      % ti 13.2
      % al 13.1
      % ve 12.9
      % li 12.7
      % ss 12.2
      % ul 11.9
      % ci 11.7
      % gi 11.0
      % sm 10.1
      % ze 10.1
      if (l<4), return, end
      switch w(l-1:l)
         case {'te'}
            if elc('icate',     5), rs('ic',  2); end
         case {'ti'}
            if elc('iciti',     5), rs('ic',  2); end
         case {'al'}
            if elc('ational',   7), rs('ate', 3);
            elseif elc('tional',    6), rs('tion',  4);
            elseif elc('ical',      4), rs('ic',   2);
            end
         case {'ve'}
            if (elc('ative',     5)&&(m2>1)), rs('',    0); end
         case {'ss'}
            if (elc('ness',4)||e('ful',3)), rs('',    0); end;
         case {'ul'}
            if elc('ful',       3), rs('',     0); end
         case {'ze'}
            if elc('alize',     5), rs('al',  2); end
      end
      j=l;
   end
   function step4()
      %       er 13.9
      %       on 13.6
      %       te 13.3
      %       ti 13.2
      %       al 13.1
      %       nt 13.1
      %       le 12.9
      %       ve 12.9
      %       ic 12.8
      %       ce 12.7
      %       us 12.3
      %       sm 10.1
      %       ze 10.1
      if (l<6), return, end 
      % to have m2>1 you need at least 4 letters and min 2 of suffix
      switch w(l-1:l)
         case {'er'}
            j=l-2;
         case {'on'}
            if elc('ion',       3)
               if (j == 0)
               elseif ~(w(j)=='s' || w(j)=='t')
                  j=l;
               end
            end;
         case {'te'}
            elc('ate',      3);
         case {'ti'}
            elc('iti',      3);
         case {'al'}
            j=l-2;
         case {'nt'}
            if     elc('ant',       3)
            elseif elc('ement',     5)
            elseif elc('ment',      4)
            elseif elc('ent',       3)
            end;
         case {'le'}
            if     elc('able',      4)
            elseif elc('ible',      4)
            end;
         case {'ve'}
            elc('ive',      3);
         case {'ic'}
            j=l-2;
         case {'ce'}
            if     elc('ance',      4)
            elseif elc('ence',      4)
            end;
         case {'us'}
            elc('ous',      3);
         case {'sm'}
            elc('ism',      3);
         case {'ze'}
            elc('ize',      3);
      end
      if (m2() > 1)
         w=w(1:j);
         l=j;
      end
   end
   function step5()
      j=l;
      if (w(l) == 'e')
         a=m2;
         if ((a > 1) || ((a == 1) && ~cvc(l-1)))
            l=l-1;
         end
      elseif ((w(l) == 'l') && c2() && (m2()>1))
         l=l-1;
      end
      w =w(1:l);
   end
end